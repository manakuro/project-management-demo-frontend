package archivedworkspaceacivityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type archivedWorkspaceActivityRepository struct {
	client *ent.Client
}

// New generates archivedWorkspaceActivity repository.
func New(client *ent.Client) ur.ArchivedWorkspaceActivity {
	return &archivedWorkspaceActivityRepository{client: client}
}
