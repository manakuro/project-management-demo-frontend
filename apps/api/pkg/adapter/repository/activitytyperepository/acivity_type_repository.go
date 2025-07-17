package activitytyperepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type activityTypeRepository struct {
	client *ent.Client
}

// New generates activityType repository
func New(client *ent.Client) ur.ActivityType {
	return &activityTypeRepository{client: client}
}
