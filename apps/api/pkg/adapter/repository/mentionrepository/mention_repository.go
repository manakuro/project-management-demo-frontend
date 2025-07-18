package mentionrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type mentionRepository struct {
	client *ent.Client
}

// New generates teammate repository.
func New(client *ent.Client) ur.Mention {
	return &mentionRepository{client: client}
}
