package archivedtaskacivityrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type archivedTaskActivityRepository struct {
	client *ent.Client
}

// New generates archivedTaskActivity repository
func New(client *ent.Client) ur.ArchivedTaskActivity {
	return &archivedTaskActivityRepository{client: client}
}
