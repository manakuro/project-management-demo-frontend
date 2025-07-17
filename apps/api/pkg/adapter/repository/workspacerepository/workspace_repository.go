package workspacerepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type workspaceRepository struct {
	client *ent.Client
}

// New generates workspace repository.
func New(client *ent.Client) ur.Workspace {
	return &workspaceRepository{client: client}
}
