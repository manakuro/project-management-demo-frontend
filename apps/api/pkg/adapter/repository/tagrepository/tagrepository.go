package tagrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type tagRepository struct {
	client *ent.Client
}

// New generates tag repository.
func New(client *ent.Client) ur.Tag {
	return &tagRepository{client: client}
}
