<template>
  <nav>
    <tags-editor></tags-editor>
    <select>
      <option value="primary">PRIMARY</option>
      <option value="secondary">SECONDARY</option>
      <option value="success">SUCCESS</option>
      <option value="warning">WARNING</option>
      <option value="alert">ALERT</option>
    </select>
  </nav>
  <textarea rows="8" cols="40"></textarea>
  <label>INSERT FILE
    <input type="file">
  </label>
  <button type="button">SAVE</button>
</template>
