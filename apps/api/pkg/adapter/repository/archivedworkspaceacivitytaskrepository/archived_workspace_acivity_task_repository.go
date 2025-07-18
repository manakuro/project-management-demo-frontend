package archivedworkspaceacivitytaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type archivedWorkspaceActivityTaskRepository struct {
	client *ent.Client
}

// New generates archivedWorkspaceActivityTask repository.
func New(client *ent.Client) ur.ArchivedWorkspaceActivityTask {
	return &archivedWorkspaceActivityTaskRepository{client: client}
}
