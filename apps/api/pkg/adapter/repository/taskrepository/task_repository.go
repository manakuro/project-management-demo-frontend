package taskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskRepository struct {
	client *ent.Client
}

// New generates task repository.
func New(client *ent.Client) ur.Task {
	return &taskRepository{client: client}
}
