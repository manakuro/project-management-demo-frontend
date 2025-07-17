package tasklikerepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type taskLikeRepository struct {
	client *ent.Client
}

// New generates taskLike repository.
func New(client *ent.Client) ur.TaskLike {
	return &taskLikeRepository{client: client}
}
