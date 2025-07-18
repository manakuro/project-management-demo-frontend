package teammatetasktabstatusrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type teammateTaskTabStatusRepository struct {
	client *ent.Client
}

// New generates teammateTaskTabStatus repository.
func New(client *ent.Client) ur.TeammateTaskTabStatus {
	return &teammateTaskTabStatusRepository{client: client}
}
