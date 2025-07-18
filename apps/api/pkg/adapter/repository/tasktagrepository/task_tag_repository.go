package tasktagrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskTagRepository struct {
	client *ent.Client
}

// New generates taskTag repository.
func New(client *ent.Client) ur.TaskTag {
	return &taskTagRepository{client: client}
}
