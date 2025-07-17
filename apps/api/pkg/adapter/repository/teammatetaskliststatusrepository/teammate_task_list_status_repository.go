package teammatetaskliststatusrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type teammateTaskListStatusRepository struct {
	client *ent.Client
}

// New generates teammateTaskListStatus repository.
func New(client *ent.Client) ur.TeammateTaskListStatus {
	return &teammateTaskListStatusRepository{client: client}
}
