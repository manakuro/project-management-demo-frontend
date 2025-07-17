package projecttaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectTaskRepository struct {
	client *ent.Client
}

// New generates projectTask repository.
func New(client *ent.Client) ur.ProjectTask {
	return &projectTaskRepository{client: client}
}
