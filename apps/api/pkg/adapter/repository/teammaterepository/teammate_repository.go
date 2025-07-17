package teammaterepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type teammateRepository struct {
	client *ent.Client
}

// New generates teammate repository.
func New(client *ent.Client) ur.Teammate {
	return &teammateRepository{client: client}
}
