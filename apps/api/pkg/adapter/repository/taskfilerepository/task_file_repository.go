package taskfilerepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskFileRepository struct {
	client *ent.Client
}

// New generates taskFile repository.
func New(client *ent.Client) ur.TaskFile {
	return &taskFileRepository{client: client}
}
