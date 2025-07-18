package workspaceteammaterepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type workspaceTeammateRepository struct {
	client *ent.Client
}

// New generates workspaceTeammate repository.
func New(client *ent.Client) ur.WorkspaceTeammate {
	return &workspaceTeammateRepository{client: client}
}
