package projectbasecolorrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectBaseColorRepository struct {
	client *ent.Client
}

// New generates projectBaseColor repository.
func New(client *ent.Client) ur.ProjectBaseColor {
	return &projectBaseColorRepository{client: client}
}
