import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 5,
  isLoading: false,
  message: "",
};

// Add number
export const increment = createAsyncThunk("/add", async (number, thunkAPI) => {
  try {
    return ++number;
  } catch (error) {
    const message = error.message || error.response;
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete number
export const decrement = createAsyncThunk(
  "/decrement",
  async (number, thunkAPI) => {
    try {
      return --number;
    } catch (error) {
      const message = error.message || error.response;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(increment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(increment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(increment.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(decrement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(decrement.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(decrement.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

export const { reset } = counterSlice.actions;
export default counterSlice.reducer;
