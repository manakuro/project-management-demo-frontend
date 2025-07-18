package tasksectionrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskSectionRepository struct {
	client *ent.Client
}

// New generates taskSection repository.
func New(client *ent.Client) ur.TaskSection {
	return &taskSectionRepository{client: client}
}
