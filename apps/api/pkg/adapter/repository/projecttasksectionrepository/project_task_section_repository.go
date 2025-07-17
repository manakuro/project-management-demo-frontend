package projecttasksectionrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectTaskSectionRepository struct {
	client *ent.Client
}

// New generates projectTaskSection repository.
func New(client *ent.Client) ur.ProjectTaskSection {
	return &projectTaskSectionRepository{client: client}
}
