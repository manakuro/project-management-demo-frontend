package tasklistcompletedstatusrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskListCompletedStatusRepository struct {
	client *ent.Client
}

// New generates taskListCompletedStatus repository.
func New(client *ent.Client) ur.TaskListCompletedStatus {
	return &taskListCompletedStatusRepository{client: client}
}
