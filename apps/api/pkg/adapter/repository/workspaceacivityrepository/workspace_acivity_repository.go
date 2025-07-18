package workspaceacivityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type workspaceActivityRepository struct {
	client *ent.Client
}

// New generates workspaceActivity repository.
func New(client *ent.Client) ur.WorkspaceActivity {
	return &workspaceActivityRepository{client: client}
}
