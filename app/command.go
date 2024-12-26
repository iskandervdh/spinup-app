package app

import (
	"fmt"

	"github.com/iskandervdh/spinup/core"
)

func (a *App) GetCommands() core.Commands {
	commands, err := a.core.GetCommands()

	if err != nil {
		fmt.Println("Error getting commands:", err)

		return nil
	}

	return commands
}
