package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/iskandervdh/spinup/common"
	"github.com/iskandervdh/spinup/config"
	"github.com/iskandervdh/spinup/core"
)

type App struct {
	ctx  context.Context
	core *core.Core
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
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

func (a *App) RunProject(projectName string) error {
	msg := a.core.TryToRun(projectName)

	if _, ok := msg.(*common.ErrMsg); ok {
		fmt.Println(msg)
		return errors.New(msg.GetText())
	} else if msg == nil {
		return fmt.Errorf("project does not exist")
	}

	return nil
}

func (a *App) GetVersion() string {
	return config.Version
}
