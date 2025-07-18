package archivedtaskacivitytaskrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type archivedArchivedTaskActivityTaskRepository struct {
	client *ent.Client
}

// New generates archivedArchivedTaskActivityTask repository.
func New(client *ent.Client) ur.ArchivedTaskActivityTask {
	return &archivedArchivedTaskActivityTaskRepository{client: client}
}
