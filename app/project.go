package app

import (
	"fmt"
	"os"

	"github.com/iskandervdh/spinup/common"
	"github.com/iskandervdh/spinup/core"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) GetProjects() core.Projects {
	err := a.core.GetCommandsConfig()
	if err != nil {
		fmt.Println("Error getting commands config:", err)
	}

	err = a.core.GetProjectsConfig()

	if err != nil {
		fmt.Println("Error getting projects config:", err)
	}

	projects, err := a.core.GetProjects()

	if err != nil {
		fmt.Println("Error getting projects:", err)

		return nil
	}

	return projects
}

func (a *App) AddProject(name string, domain string, port int, commandNames []string) error {
	err := a.core.GetCommandsConfig()

	if err != nil {
		return fmt.Errorf("error getting commands config: %s", err)
	}

	err = a.core.GetProjectsConfig()

	if err != nil {
		return fmt.Errorf("error getting projects config: %s", err)
	}

	msg := a.core.AddProject(name, domain, port, commandNames)

	if _, ok := msg.(*common.ErrMsg); ok {
		fmt.Println(msg.GetText())
		return fmt.Errorf("%s", msg.GetText())
	}

	return nil
}

func (a *App) RemoveProject(name string) error {
	err := a.core.GetCommandsConfig()

	if err != nil {
		return fmt.Errorf("error getting commands config: %s", err)
	}

	err = a.core.GetProjectsConfig()

	if err != nil {
		return fmt.Errorf("error getting projects config: %s", err)
	}

	msg := a.core.RemoveProject(name)

	if _, ok := msg.(*common.ErrMsg); ok {
		fmt.Println(msg.GetText())
		return fmt.Errorf("%s", msg.GetText())
	}

	return nil
}

func (a *App) SelectProjectDirectory(projectName string, defaultDir string) error {
	if defaultDir == "" {
		d, err := os.UserHomeDir()

		if err != nil {
			defaultDir = ""
		} else {
			defaultDir = d
		}
	}

	dir, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title:            "Select a directory for project " + projectName,
		DefaultDirectory: defaultDir,
	})

	if err != nil {
		fmt.Println("Error selecting directory:", err)
		return err
	}

	if dir == "" {
		return fmt.Errorf("no directory selected")
	}

	msg := a.core.SetProjectDir(projectName, &dir)

	if _, ok := msg.(*common.ErrMsg); ok {
		fmt.Println(msg.GetText())
		return fmt.Errorf("%s", msg.GetText())
	}

	return nil
}

func (a *App) GetProjectLogs(projectName string) (string, error) {
	runningProject, ok := a.runningProjects[projectName]

	if !ok {
		return "", fmt.Errorf("project '%s' is not running", projectName)
	}

	logFilePath, err := runningProject.GetLogFilePath()

	if err != nil {
		fmt.Println(err)
		return "", fmt.Errorf("no logs available for project '%s'", projectName)
	}

	logs, err := os.ReadFile(logFilePath)

	if err != nil {
		return "", fmt.Errorf("error reading logs for project '%s': %s", projectName, err)
	}

	return string(logs), nil
}
