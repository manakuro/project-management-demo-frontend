package taskpriorityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskPriorityRepository struct {
	client *ent.Client
}

// New generates taskPriority repository.
func New(client *ent.Client) ur.TaskPriority {
	return &taskPriorityRepository{client: client}
}
