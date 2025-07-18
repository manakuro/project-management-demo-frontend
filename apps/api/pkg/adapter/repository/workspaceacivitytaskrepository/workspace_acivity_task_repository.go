package workspaceacivitytaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type workspaceActivityTaskRepository struct {
	client *ent.Client
}

// New generates workspaceActivityTask repository.
func New(client *ent.Client) ur.WorkspaceActivityTask {
	return &workspaceActivityTaskRepository{client: client}
}
