package taskfeedlikerepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskFeedLikeRepository struct {
	client *ent.Client
}

// New generates taskFeedLike repository.
func New(client *ent.Client) ur.TaskFeedLike {
	return &taskFeedLikeRepository{client: client}
}
