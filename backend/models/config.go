package models

import "os"

func IsDev() bool {
	return os.Getenv("GIN_MODE") != "release"
}
