
import { Stage, StageInfo } from './types.ts';

export const STAGES: StageInfo[] = [
  { id: Stage.ONBOARDING_REQUEST, label: 'Onboarding Request', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: 'fa-file-import' },
  { id: Stage.OVERLAP_CHECK, label: 'Overlap Check', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'fa-magnifying-glass-location' },
  { id: Stage.CHEF_APPROVAL, label: 'Chef Approval', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'fa-utensils' },
  { id: Stage.FASSI_APPLY, label: 'FASSI Apply', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: 'fa-signature' },
  { id: Stage.ID_CREATION, label: 'ID Creation', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'fa-id-card' },
  { id: Stage.INTEGRATION, label: 'Integration', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: 'fa-circle-nodes' },
  { id: Stage.TRAINING, label: 'Training', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: 'fa-chalkboard-user' },
  { id: Stage.HANDOVER, label: 'Handover', color: 'bg-teal-50 text-teal-700 border-teal-200', icon: 'fa-handshake' },
  { id: Stage.OUTLET_LIVE, label: 'Outlet Live', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: 'fa-rocket' },
];

export const STAGE_ORDER = STAGES.map(s => s.id);
