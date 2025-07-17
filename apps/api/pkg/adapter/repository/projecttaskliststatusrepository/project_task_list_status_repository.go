package projecttaskliststatusrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type projectTaskListStatusRepository struct {
	client *ent.Client
}

// New generates projectTaskListStatus repository.
func New(client *ent.Client) ur.ProjectTaskListStatus {
	return &projectTaskListStatusRepository{client: client}
}
