import type { WorkflowManifest } from './apply-swc-transform.js';

/**
 * Deep merge two manifest entry records, combining the `exports` object
 * from both sources when entries have the same ID.
 *
 * This is used to merge manifests from different bundle contexts (step vs workflow)
 * where the same entry may have different export conditions.
 *
 * @example
 * // Step bundle provides 'default' condition
 * const stepsManifest = { "step//./add": { stepId: "step//./add", name: "add", exports: { default: "add.js" } } }
 * // Workflow bundle provides 'workflow' condition
 * const workflowsManifest = { "step//./add": { stepId: "step//./add", name: "add", exports: { workflow: "add.js" } } }
 * // Merged result has both conditions
 * deepMergeManifestEntries(stepsManifest, workflowsManifest)
 * // => { "step//./add": { stepId: "step//./add", name: "add", exports: { default: "add.js", workflow: "add.js" } } }
 */
export function deepMergeManifestEntries(
  a: Record<string, any> = {},
  b: Record<string, any> = {}
): Record<string, any> {
  const result: Record<string, any> = { ...a };
  for (const [id, data] of Object.entries(b)) {
    if (result[id]) {
      // Merge exports from both manifests
      result[id] = {
        ...result[id],
        exports: { ...result[id].exports, ...data.exports },
      };
    } else {
      result[id] = data;
    }
  }
  return result;
}

/**
 * Merge two WorkflowManifest objects, deeply merging the exports for
 * steps, workflows, and classes that appear in both.
 */
export function mergeManifests(
  stepsManifest: Partial<WorkflowManifest>,
  workflowsManifest: Partial<WorkflowManifest>
): WorkflowManifest {
  return {
    steps: deepMergeManifestEntries(
      stepsManifest.steps,
      workflowsManifest.steps
    ),
    workflows: deepMergeManifestEntries(
      stepsManifest.workflows,
      workflowsManifest.workflows
    ),
    classes: deepMergeManifestEntries(
      stepsManifest.classes,
      workflowsManifest.classes
    ),
  };
}
