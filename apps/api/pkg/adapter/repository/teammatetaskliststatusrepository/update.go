package teammatetaskliststatusrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/tasklistcompletedstatus"
	"project-management-demo-backend/ent/tasklistsortstatus"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *teammateTaskListStatusRepository) Update(ctx context.Context, input model.UpdateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	q := client.
		TeammateTaskListStatus.UpdateOneID(input.ID).
		SetInput(input)

	if input.TaskListSortStatusCode != nil {
		taskListSortStatus, terr := client.
			TaskListSortStatus.
			Query().
			Where(tasklistsortstatus.StatusCodeEQ(*input.TaskListSortStatusCode)).
			Only(ctx)

		if terr != nil {
			return nil, model.NewDBError(terr)
		}

		q.SetTaskListSortStatusID(taskListSortStatus.ID)
	}

	if input.TaskListCompletedStatusCode != nil {
		taskListCompletedStatus, terr := client.
			TaskListCompletedStatus.
			Query().
			Where(tasklistcompletedstatus.StatusCodeEQ(*input.TaskListCompletedStatusCode)).
			Only(ctx)

		if terr != nil {
			return nil, model.NewDBError(terr)
		}

		q.SetTaskListCompletedStatusID(taskListCompletedStatus.ID)
	}

	res, err := q.Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}
