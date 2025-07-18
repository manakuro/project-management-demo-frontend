package tasktagrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/tasktag"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskTagRepository) Create(ctx context.Context, input model.CreateTaskTagInput) (*model.TaskTag, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	res, err := client.
		TaskTag.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	taskTag, err := client.TaskTag.Query().
		Where(tasktag.ID(res.ID)).
		WithTag(func(tq *ent.TagQuery) {
			repositoryutil.WithTag(tq)
		}).Only(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return taskTag.Unwrap(), nil
}
