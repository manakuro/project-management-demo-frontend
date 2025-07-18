package taskacivityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskActivityRepository struct {
	client *ent.Client
}

// New generates taskActivity repository.
func New(client *ent.Client) ur.TaskActivity {
	return &taskActivityRepository{client: client}
}
