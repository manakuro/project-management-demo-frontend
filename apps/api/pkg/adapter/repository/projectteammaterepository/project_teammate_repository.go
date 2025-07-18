package projectteammaterepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectTeammateRepository struct {
	client *ent.Client
}

// New generates projectTeammate repository.
func New(client *ent.Client) ur.ProjectTeammate {
	return &projectTeammateRepository{client: client}
}
