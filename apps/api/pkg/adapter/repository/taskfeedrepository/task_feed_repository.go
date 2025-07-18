package taskfeedrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskFeedRepository struct {
	client *ent.Client
}

// New generates taskFeed repository.
func New(client *ent.Client) ur.TaskFeed {
	return &taskFeedRepository{client: client}
}
