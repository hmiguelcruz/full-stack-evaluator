using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;
using TaskManager.Services;

namespace TaskManager.API
{
    [Route("tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        private int GetUserId()
        {
            // Extract X-User-Id from header, defaulting to 1 for simulation purposes
            if (Request.Headers.TryGetValue("X-User-Id", out var userIdVal) && int.TryParse(userIdVal, out int userId))
            {
                return userId;
            }
            return 1;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = GetUserId();
            var tasks = await _service.GetAllAsync(userId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItem task)
        {
            var userId = GetUserId();
            var created = await _service.CreateAsync(task, userId);

            // Standardizing CreatedAtAction
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskItem updated)
        {
            var userId = GetUserId();
            var result = await _service.UpdateAsync(id, updated, userId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var success = await _service.DeleteAsync(id, userId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
