package iconrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type iconRepository struct {
	client *ent.Client
}

// New generates icon repository.
func New(client *ent.Client) ur.Icon {
	return &iconRepository{client: client}
}
