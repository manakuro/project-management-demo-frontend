import type { UrlObject } from 'node:url';

export { isHomeDetailURL, getHomeDetailId } from './home';
export { isInboxDetailURL, getInboxDetailId } from './inbox';
export { taskDetailURL } from './taskDetail';
export {
  isMyTasksListURL,
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksFilesURL,
  isMyTasksDetailURL,
  isMyTasksDetailURLById,
  getMyTasksDetailFeedId,
  getMyTasksDetailFeedURL,
  getMyTasksDetailId,
} from './myTasks';
export {
  isProjectsListURL,
  isProjectsBoardURL,
  isProjectsCalendarURL,
  isProjectsFilesURL,
  isProjectsDetailURL,
  isProjectsDetailURLById,
  getProjectsDetailFeedId,
  getProjectsDetailFeedURL,
  getProjectsDetailId,
} from './projects';
export {
  isWorkspacesURL,
  isWorkspacesOverviewURL,
  isWorkspacesMessageURL,
  isWorkspacesCalendarURL,
  getWorkspacesIdFromURL,
} from './workspace';

export const convertPathnameObjToPathname = (urlObject: UrlObject): string => {
  const pathname = urlObject.pathname || '';
  const query = urlObject.query || {};

  const url = pathname
    .replace(/[[\]]/g, '')
    .split('/')
    .filter((t) => !!t)
    .map((t) => ((query as any)[t] ? (query as any)[t] : t))
    .join('/');

  return `/${url}`;
};
