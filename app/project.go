package app

import (
	"fmt"
	"os"

	"github.com/iskandervdh/spinup/common"
	"github.com/iskandervdh/spinup/core"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) GetProjects() core.Projects {
	projects, err := a.core.GetProjects()

	if err != nil {
		fmt.Println("Error getting projects:", err)

		return nil
	}

	return projects
}

func (a *App) SelectProjectDirectory(projectName string) error {
	defaultDir, err := os.UserHomeDir()

	if err != nil {
		defaultDir = ""
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
