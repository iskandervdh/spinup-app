package app

import (
	"context"
	_ "embed"
	"fmt"

	"github.com/iskandervdh/spinup/config"
	"github.com/iskandervdh/spinup/core"
)

//go:embed .version
var version string

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

	err := a.core.GetCommandsConfig()

	if err != nil {
		fmt.Println("Error getting commands config:", err)
	}

	err = a.core.GetProjectsConfig()

	if err != nil {
		fmt.Println("Error getting projects config:", err)
	}
}

func (a *App) GetSpinupVersion() string {
	return config.Version
}

func (a *App) GetAppVersion() string {
	return version
}
