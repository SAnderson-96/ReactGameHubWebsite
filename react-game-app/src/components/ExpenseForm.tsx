import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import categories from "../models/categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters long" }),
  amount: z.number({ invalid_type_error: "Amount is required" }).positive(),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Select a Category" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface props {
  onFormSubmit: (expense: ExpenseFormData) => void;
}

function ExpenseForm({ onFormSubmit }: props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  const onCategorySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onFormSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          className="form-select"
          onChange={onCategorySelect}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default ExpenseForm;
