package projecticonrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectIconRepository struct {
	client *ent.Client
}

// New generates projectIcon repository.
func New(client *ent.Client) ur.ProjectIcon {
	return &projectIconRepository{client: client}
}
