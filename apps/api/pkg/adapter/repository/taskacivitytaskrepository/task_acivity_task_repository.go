package taskacivitytaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskActivityTaskRepository struct {
	client *ent.Client
}

// New generates taskActivityTask repository.
func New(client *ent.Client) ur.TaskActivityTask {
	return &taskActivityTaskRepository{client: client}
}
