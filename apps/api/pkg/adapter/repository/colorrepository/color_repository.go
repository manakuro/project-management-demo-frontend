package colorrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type colorRepository struct {
	client *ent.Client
}

// New generates color repository.
func New(client *ent.Client) ur.Color {
	return &colorRepository{client: client}
}
