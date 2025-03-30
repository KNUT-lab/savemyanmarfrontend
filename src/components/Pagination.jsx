import { Show } from "solid-js";

export function Pagination(props) {
  return (
    <div class="flex justify-between items-center mt-6">
      <div class="text-sm text-gray-600">Showing {props.count} items</div>

      <div class="flex space-x-2">
        <Show when={props.previous}>
          <button
            onClick={() => props.onPageChange(props.previous)}
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition"
          >
            Previous
          </button>
        </Show>

        <Show when={props.next}>
          <button
            onClick={() => props.onPageChange(props.next)}
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          >
            Next
          </button>
        </Show>
      </div>
    </div>
  );
}
