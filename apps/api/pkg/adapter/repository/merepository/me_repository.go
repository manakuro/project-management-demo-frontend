package merepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type meRepository struct {
	client *ent.Client
}

// New generates teammate repository.
func New(client *ent.Client) ur.Me {
	return &meRepository{client: client}
}
