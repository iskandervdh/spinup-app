package app

import (
	"context"
	"fmt"

	"github.com/iskandervdh/spinup/config"
	"github.com/iskandervdh/spinup/core"
)

type App struct {
	ctx             context.Context
	core            *core.Core
	runningProjects map[string]runningProject
}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.core = core.New()

	err := a.core.GetProjectsConfig()

	if err != nil {
		fmt.Println("Error getting projects config:", err)
	}
}

func (a *App) GetProjects() core.Projects {
	projects, err := a.core.GetProjects()

	if err != nil {
		fmt.Println("Error getting projects:", err)
		return nil
	}

	return projects
}

func (a *App) GetCommands() core.Commands {
	commands, err := a.core.GetCommands()

	if err != nil {
		fmt.Println("Error getting commands:", err)
		return nil
	}

	return commands
}

func (a *App) GetVersion() string {
	return config.Version
}
