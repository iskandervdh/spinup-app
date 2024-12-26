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
	runningProjects map[string]*runningProject
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

func (a *App) GetVersion() string {
	return config.Version
}
