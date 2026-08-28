import { MAX_ATTACHMENTS } from "@/lib/validations/quote";
import type { QuoteFieldErrors } from "@/types/leads";

type QuoteStepPhotosProps = {
  files: File[];
  errors: QuoteFieldErrors;
  onChange: (files: File[]) => void;
};

export function QuoteStepPhotos({
  files,
  errors,
  onChange,
}: QuoteStepPhotosProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="photos"
          className="block text-sm font-medium tracking-wide text-forest"
        >
          Photos du logement ou du chantier
        </label>
        <p id="photos-hint" className="mt-2 text-sm text-ink-muted">
          Facultatif. JPEG, PNG ou WebP, {MAX_ATTACHMENTS} fichiers maximum, 4 Mo
          chacun.
        </p>
      </div>
      <input
        id="photos"
        name="photos"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        aria-describedby={errors.attachments ? "photos-error photos-hint" : "photos-hint"}
        aria-invalid={errors.attachments ? true : undefined}
        className="min-h-11 w-full rounded-sm border border-line bg-paper-elevated px-3 py-2 text-sm text-ink file:mr-4 file:border-0 file:bg-stone file:px-3 file:py-2 file:text-sm file:font-medium file:text-forest"
        onChange={(event) => {
          const next = Array.from(event.target.files ?? []);
          onChange(next);
        }}
      />
      {files.length > 0 ? (
        <ul className="space-y-2 text-sm text-ink-muted">
          {files.map((file) => (
            <li key={`${file.name}-${file.size}`}>{file.name}</li>
          ))}
        </ul>
      ) : null}
      {errors.attachments ? (
        <p id="photos-error" className="text-sm text-danger" role="alert">
          {errors.attachments}
        </p>
      ) : null}
    </div>
  );
}
