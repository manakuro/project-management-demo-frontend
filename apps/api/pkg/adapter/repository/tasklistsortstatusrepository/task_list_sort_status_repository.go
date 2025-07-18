package tasklistsortstatusrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskListSortStatusRepository struct {
	client *ent.Client
}

// New generates taskListSortStatus repository.
func New(client *ent.Client) ur.TaskListSortStatus {
	return &taskListSortStatusRepository{client: client}
}
